from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Spacer, Image
from reportlab.pdfgen import canvas
import qrcode

def generate_certificate(event_name, student_name):
    # Create the PDF document
    pdf = canvas.Canvas("certificate.pdf", pagesize=letter)

    # Set up the certificate content
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawString(100, 600, "Certificate of Participation")
    pdf.setFont("Helvetica", 18)
    pdf.drawString(100, 500, "This is to certify that")
    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawString(100, 450, student_name)
    pdf.setFont("Helvetica", 18)
    pdf.drawString(100, 400, "has successfully participated in the")
    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawString(100, 350, event_name)

    # Generate the QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(f"Certificate for {student_name} in {event_name}")
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    qr_filename = "qr_code.png"
    qr_image.save(qr_filename)

    # Add the QR code image to the certificate
    pdf.drawInlineImage(qr_filename, 400, 50, width=1.5*inch, height=1.5*inch)

    # Save and close the PDF
    pdf.save()

# Example usage
event_name = "Amazing Conference"
student_name = "John Doe"
generate_certificate(event_name, student_name)
