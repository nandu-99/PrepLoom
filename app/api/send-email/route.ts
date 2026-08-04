const emailEndpoint = "https://quick-send-mail.vercel.app/api/send-email";
const recipient = "preploomtech@gmail.com";

const contactReasons = new Set([
  "Content correction",
  "Resource suggestion",
  "Product feedback",
  "General question",
]);

const feedbackTypes = new Set([
  "Content issue",
  "Feature suggestion",
  "Missing topic",
  "Website experience",
  "Something else",
]);

type Submission = {
  formType?: unknown;
  name?: unknown;
  email?: unknown;
  category?: unknown;
  message?: unknown;
  pageUrl?: unknown;
};

function cleanOptional(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatValue(value: string) {
  return value || "Not provided";
}

export async function POST(request: Request) {
  try {
    const submission = (await request.json()) as Submission;
    const formType = submission.formType;
    const name = cleanOptional(submission.name, 120);
    const email = cleanOptional(submission.email, 254);
    const category = cleanOptional(submission.category, 80);
    const message = cleanOptional(submission.message, 5000);
    const pageUrl = cleanOptional(submission.pageUrl, 1000);

    if (formType !== "contact" && formType !== "feedback") {
      return Response.json({ message: "Invalid form submission." }, { status: 400 });
    }

    const isContact = formType === "contact";
    const allowedCategories = isContact ? contactReasons : feedbackTypes;

    if (
      !message ||
      !allowedCategories.has(category) ||
      (isContact && (!name || !email)) ||
      (email && !isEmail(email))
    ) {
      return Response.json({ message: "Please check the form fields." }, { status: 400 });
    }

    const label = isContact ? "Contact" : "Feedback";
    const text = [
      `New PrepLoom ${label.toLowerCase()} submission`,
      "",
      `Name: ${formatValue(name)}`,
      `Email: ${formatValue(email)}`,
      `${isContact ? "Reason" : "Feedback type"}: ${category}`,
      ...(isContact ? [] : [`Page link: ${formatValue(pageUrl)}`]),
      "",
      `${isContact ? "Message" : "Feedback"}:`,
      message,
    ].join("\n");

    const response = await fetch(emailEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: recipient,
        subject: `PrepLoom ${label}: ${category}`,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return Response.json(
        { message: "The email service could not send your message." },
        { status: 502 },
      );
    }

    return Response.json({ message: "Your message was sent successfully." });
  } catch {
    return Response.json(
      { message: "Your message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
