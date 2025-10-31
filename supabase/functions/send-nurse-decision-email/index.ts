import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, decision } = await req.json();

    if (!email || !decision) {
      return new Response(
        JSON.stringify({ error: "Missing email or decision" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const subject = decision === "approved" 
      ? "Your Nurse Application Has Been Approved!"
      : "Update on Your Nurse Application";

    const message = decision === "approved"
      ? "Congratulations! Your nurse application has been approved. You can now log in to your account and start taking appointments. Welcome to our healthcare team!"
      : "Thank you for your interest in joining our healthcare team. Unfortunately, your nurse application was not approved at this time. Please review your credentials and feel free to reapply in the future.";

    console.log(`Sending email to ${email} with decision: ${decision}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email notification sent (simulated)",
        details: {
          to: email,
          subject,
          decision
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in edge function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});