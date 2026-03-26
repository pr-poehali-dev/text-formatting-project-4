import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту avcybulya@yandex.ru"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        source = body.get("source", "Сайт")

        if not name or not phone:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Заполните имя и телефон"}, ensure_ascii=False),
            }

        smtp_password = os.environ.get("SMTP_PASSWORD", "")
        smtp_user = "avcybulya@yandex.ru"
        to_email = "avcybulya@yandex.ru"

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новая заявка с сайта — {name}"
        msg["From"] = smtp_user
        msg["To"] = to_email

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 24px; border-radius: 12px;">
            <h2 style="color: #f59e0b; margin: 0 0 20px;">Новая заявка с сайта</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #9ca3af; padding: 8px 0; border-bottom: 1px solid #2a2a2a; width: 40%;">Имя</td>
                <td style="color: #ffffff; padding: 8px 0; border-bottom: 1px solid #2a2a2a;">{name}</td>
              </tr>
              <tr>
                <td style="color: #9ca3af; padding: 8px 0; border-bottom: 1px solid #2a2a2a;">Телефон</td>
                <td style="color: #ffffff; padding: 8px 0; border-bottom: 1px solid #2a2a2a;">{phone}</td>
              </tr>
              <tr>
                <td style="color: #9ca3af; padding: 8px 0;">Источник</td>
                <td style="color: #ffffff; padding: 8px 0;">{source}</td>
              </tr>
            </table>
          </div>
        </div>
        """

        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, to_email, msg.as_string())

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)}),
        }