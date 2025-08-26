// Supabase Edge Function สำหรับส่งอีเมล
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { to, subject, message } = await req.json()

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!to || !subject || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: to, subject, message' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            )
        }

        // ส่งอีเมลผ่าน SMTP (ใช้ Resend API หรือ SendGrid)
        // ในตัวอย่างนี้จะใช้ Resend API
        const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY not found in environment variables')
            return new Response(
                JSON.stringify({ error: 'Email service not configured' }),
                {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            )
        }

        const emailData = {
            from: 'บ้านเช่าสวยงาม <noreply@yourdomain.com>', // เปลี่ยนเป็นโดเมนจริง
            to: [to],
            subject: subject,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc3545, #ff6b7a); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🏠 บ้านเช่าสวยงาม</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">ข้อความใหม่จากลูกค้า</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #dc3545; margin-top: 0;">หัวข้อ: ${subject}</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545;">
              <pre style="font-family: 'Sarabun', Arial, sans-serif; white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</pre>
            </div>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 14px; padding: 20px;">
            <p>ข้อความนี้ส่งจากเว็บไซต์บ้านเช่าสวยงาม</p>
            <p style="margin: 5px 0;">📍 482C+C45 Mueang Tai, Mueang Si Sa Ket District, Si Sa Ket</p>
            <p style="margin: 5px 0;">📞 0868555543 | 💬 LINE: mansuang</p>
          </div>
        </div>
      `,
            text: message
        }

        // ส่งอีเมลผ่าน Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Resend API error:', errorData)
            return new Response(
                JSON.stringify({ error: 'Failed to send email', details: errorData }),
                {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            )
        }

        const result = await response.json()
        console.log('Email sent successfully:', result)

        return new Response(
            JSON.stringify({ success: true, message: 'Email sent successfully', id: result.id }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )

    } catch (error) {
        console.error('Error in send-email function:', error)
        return new Response(
            JSON.stringify({ error: 'Internal server error', details: error.message }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    }
})
