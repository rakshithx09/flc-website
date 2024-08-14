// pages/shipping-and-delivery-policy.tsx
import { type FC } from "react";
import ParticlesBackground from "~/components/background/particles";

import Footer from "~/components/footer";

const Shipping: FC = () => {
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
    <div   >
     
      <header className="py-4  shadow-md ">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold">
            INSPIRANTE TECHNOLOGIES PRIVATE LIMITED
          </h1>
          <p className="mt-2 text-center text-xl">
            Shipping and Delivery Policy
          </p>
          <p className="mt-1 text-center text-sm">
            Last updated on Oct 20th 2022
          </p>
        </div>
      </header>

  
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 rounded-lg bg-gradient p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Shipping Policy</h2>
          <p>
            Shipping is not applicable for business. For any queries related to
            delivery, please contact our support team.
          </p>
        </section>

       
        <section className="rounded-lg bg-gradient p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">
            Membership Registration
          </h2>
          <div className="rounded-lg border border-gray-300 bg-gradient p-6 ">
            <h3 className="mb-2 text-xl font-semibold">Membership Fee</h3>
            <p className="mb-4 text-lg">₹400</p>
            <p className="mb-4">
              One-time payment. Valid until you are a part of the college. All
              of the club events will be free for members.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Shipping;