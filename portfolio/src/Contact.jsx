import "./contact.css";
import ProfileCard from "./profileCard";

export default function Contact() {
  async function handleSubmit(e){
    e.preventDefault();

    const formData={
      name:e.target[0].value,
      email:e.target[1].value,
      subject:e.target[2].value,
      message:e.target[3].value,
    };

    await fetch("https://gunaj-chugh.onrender.com/api/contact",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(formData)
    });

    alert("Message Sent!");
    e.target.reset();
  };

  return (
    <div className="main-layout">

      {/* Sidebar */}
      <ProfileCard />

      {/* Content */}
      <div className="content">

        <div className="contact-header">
          <h1>Contact</h1>
          <p>Have a project, idea, or opportunity? Let’s connect.</p>
        </div>

        {/* ✅ FIXED WRAPPER */}
        <div className="contact-wrapper">

          {/* LEFT */}
          <div className="contact-box">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>

              <div className="mb-3">
                <label>Subject</label>
                <input type="text" placeholder="Project / Opportunity" />
              </div>

              <div className="mb-3">
                <label>Message</label>
                <textarea rows="4" placeholder="Write your message..." required></textarea>
              </div>

              <button type="submit">Send Message</button>

            </form>

          </div>

          {/* ✅ RIGHT SIDE (NOW CORRECTLY PLACED) */}
          <div className="contact-side">
            <div className="cta-box">
              <h2>Let’s Work Together</h2>

              <p>
                Open to internships, freelance work, and full-time opportunities.
                If you have a project or idea, I’d love to collaborate.
              </p>

              <div className="cta-buttons">
                <a href="mailto:gunnajpchugh@gmail.com">Email Me</a>
                <a href="https://www.linkedin.com/in/gunnaj/" target="_blank">LinkedIn</a>
                <a href="https://github.com/codedbygunnaj" target="_blank">GitHub</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}