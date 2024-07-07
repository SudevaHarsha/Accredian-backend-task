const { PrismaClient } = require('@prisma/client');
const sendReferralEmail = require('../services/emailService');

const prisma = new PrismaClient();

const createReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  // Manual validation
  let errors = [];
  if (!referrerName.trim()) errors.push({ field: "referrerName", message: "Referrer name is required" });
  if (!referrerEmail.trim() || !/\S+@\S+\.\S+/.test(referrerEmail)) errors.push({ field: "referrerEmail", message: "Valid referrer email is required" });
  if (!refereeName.trim()) errors.push({ field: "refereeName", message: "Referee name is required" });
  if (!refereeEmail.trim() || !/\S+@\S+\.\S+/.test(refereeEmail)) errors.push({ field: "refereeEmail", message: "Valid referee email is required" });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
      },
    });

    await sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail);
    return res.status(201).json({ message: 'Referral submitted successfully', referral });
  } catch (error) {
    console.error('Error saving referral:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createReferral,
};
