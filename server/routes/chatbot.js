const express = require("express");
const natural = require("natural");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const userMessage = req.body.message;
    // console.log("Received message:", userMessage);
    const response = generateResponse(userMessage);
    res.json({ response });
  } catch (error) {
    // console.error("Error in chatbot route:", error);
    res
      .status(500)
      .json({ response: "An error occurred. Please try again later." });
  }
});

function generateResponse(message) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(message.toLowerCase());

  if (tokens.includes("order") && tokens.includes("status")) {
    return 'To track your order, please provide your order ID. You can also visit the "My Orders" section on our website to view the status of all your orders.';
  }
  if (tokens.includes("track") && tokens.includes("order")) {
    return 'To track your order, please provide your order ID. You can track your order on the "My Orders" page by entering your order ID or checking your recent orders list.';
  }
  if (tokens.includes("product") && tokens.includes("inquiry")) {
    return "Please provide the product name or ID you are inquiring about.";
  }
  if (tokens.includes("return") && tokens.includes("product")) {
    return "To return a product, go to your orders page, select the product you wish to return, and follow the instructions. If you need further assistance, contact our support team.";
  }
  if (tokens.includes("contact") && tokens.includes("support")) {
    return "You can contact our support team by emailing support@marketplace.com or calling +1234567890. Our support hours are from 9 AM to 5 PM, Monday to Friday.";
  }
  if (tokens.includes("faq") || tokens.includes("faqs")) {
    return "Here are some frequently asked questions:\n1. How do I track my order?\n2. How do I return a product?\n3. How do I contact support?\n4. How do I change my account details?\n5. What payment methods are accepted?";
  }
  if (tokens.includes("support")) {
    return "How can I assist you with support? You can ask about order tracking, product inquiries, returns, or other issues. For immediate assistance, contact our support team.";
  }
  if (
    tokens.includes("payment") &&
    (tokens.includes("method") || tokens.includes("methods"))
  ) {
    return "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. Please visit our payment options page for more details.";
  }
  if (tokens.includes("account") && tokens.includes("details")) {
    return "To change your account details, go to your account settings page. You can update your personal information, change your password, and manage your preferences there.";
  }
  if (tokens.includes("shipping") && tokens.includes("cost")) {
    return "Shipping costs vary depending on your location and the shipping method chosen. You can see the estimated shipping cost during the checkout process.";
  }
  if (tokens.includes("delivery") && tokens.includes("time")) {
    return "Delivery times depend on your location and the shipping method chosen. Standard delivery typically takes 5-7 business days, while expedited delivery takes 2-3 business days.";
  }
  if (tokens.includes("cancel") && tokens.includes("order")) {
    return 'To cancel your order, go to the "My Orders" page, select the order you wish to cancel, and follow the cancellation instructions. If your order has already been shipped, you may need to return it once it arrives.';
  }
  if (tokens.includes("refund") && tokens.includes("policy")) {
    return "Our refund policy allows you to return products within 30 days of receipt for a full refund. To initiate a return, go to your orders page and follow the instructions. Refunds are processed within 5-7 business days after the returned item is received.";
  }
  if (tokens.includes("exchange") && tokens.includes("product")) {
    return "To exchange a product, go to your orders page, select the product you wish to exchange, and follow the instructions. Exchanges are subject to product availability.";
  }
  if (tokens.includes("order") && tokens.includes("confirmation")) {
    return "You will receive an order confirmation email shortly after placing your order. If you did not receive it, please check your spam folder or contact our support team for assistance.";
  }

  // Default fallback response
  return "I am here to help with your marketplace inquiries. How can I assist you today?";
}

module.exports = router;
