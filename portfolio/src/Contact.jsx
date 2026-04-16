import "./contact.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="container contact-container">

        <div className="contact-box">

          <h2 className="text-center mb-3">Get in Touch</h2>
          <p className="text-center text-muted mb-4">
            Have a project, idea, or opportunity? Let’s connect.
          </p>

          <form>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Your Name" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="your@email.com" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" placeholder="Project / Opportunity" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4" placeholder="Write your message..." required></textarea>
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}