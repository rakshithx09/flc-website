import { type NextPage } from "next";
import React from "react";

import SendResetForm from "~/components/forms/send-reset";

const SendResetEmail: NextPage = () => {
  return (
    <>
      <div className="-mt-8 flex h-screen w-full items-center justify-center bg-gradient-to-bl from-[#1e1333] via-[#0a001c] to-[#0e0a2a]">
        <div className="mx-4 w-4/5 border-spacing-1 justify-center rounded-lg border-white backdrop-blur-lg sm:mx-8 sm:w-96">
          <div className="border-purple-950 rounded-2xl border bg-gradient-to-rl from-[#1e1333] via-[#0a001c] to-[#350236be] p-8  filter backdrop-blur-3xl">
            <h1 className=" title mb-8 flex justify-center text-center font-medium text-3xl text-white">
              Reset Password
            </h1>
            <SendResetForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default SendResetEmail;
