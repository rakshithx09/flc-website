import { type FC } from "react";
import ParticlesBackground from "~/components/background/particles";

import Footer from "~/components/footer";

const ContactUs: FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <ParticlesBackground />
      </div>
    <div >
      {/* Header Section */}
      <header className="py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="heading text-center font-bold">
            INSPIRANTE TECHNOLOGIES PRIVATE LIMITED
          </h1>
          <p className="subheading  mt-2 text-center">Contact Us</p>
          <p className="caption mt-1 text-center text-gray-600">
            Last updated on Oct 20th 2022
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-8 ">
        <section className="rounded-lg bg-gradient p-6 shadow-md ">
          <p className="mb-4 text-lg font-semibold">
            You may contact us using the information below:
          </p>
          <ul className="list-none space-y-4">
            <li>
              <strong>Merchant Legal entity name:</strong> INSPIRANTE
              TECHNOLOGIES PRIVATE LIMITED
            </li>
            <li>
              <strong>Registered Address:</strong> 2-1-22, Bombay House,
              Kalsanka, Kunjibettu P O Udupi KARNATAKA 576102
            </li>
            <li>
              <strong>Operational Address:</strong> 2-1-22, Bombay House,
              Kalsanka, Kunjibettu P O Udupi KARNATAKA 576102
            </li>
            <li>
              <strong>Telephone No:</strong> 8197903771
            </li>
            <li>
              <strong>E-Mail ID:</strong>{" "}
              <a
                href="mailto:inspirantech@gmail.com"
                className="text-blue-500 hover:underline"
              >
                inspirantech@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default ContactUs;