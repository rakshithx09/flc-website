import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { ComboBox } from "~/components/ui/combobox";
import {
  FormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { InputOTP, InputOTPSlot } from "~/components/ui/input-otp";
import { Password } from "~/components/ui/password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { cn, getGraduationYears } from "~/lib/utils";
import { api } from "~/utils/api";
import { signUpZ } from "~/zod/authZ";

interface Props {
  className?: string;
}

const SignUpForm: FunctionComponent<Props> = ({ className }) => {
  const { data: branches } = api.branch.getAllBranch.useQuery();

  const signUp = api.auth.signUp.useMutation();

  const formSchema = signUpZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      branchId: "",
      year: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Signing up...");
    signUp.mutate(
      {
        branchId: values.branchId,
        confirmPassword: values.confirmPassword,
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone,
        year: values.year,
      },
      {
        onSuccess: ({ emailSent }) => {
          toast.dismiss(toastId);
          if (emailSent)
            toast.success("Verification email sent! Please check your inbox");
          else
            toast.success("Signed up successfully! Please verify your email");
        },
        onError: (error) => {
          toast.dismiss(toastId);
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-4")}
      >
        <FormMessage className="flex justify-center text-3xl text-white/90">
          Signup
        </FormMessage>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="rounded-lg bg-black p-4">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <InputOTP maxLength={10} {...field}>
                  <InputOTPSlot index={0} className="bg-white/15" />
                  <InputOTPSlot index={1} className="bg-white/15" />
                  <InputOTPSlot index={2} className="bg-white/15" />
                  <InputOTPSlot index={3} className="bg-white/15" />
                  <InputOTPSlot index={4} className="bg-white/15" />
                  <InputOTPSlot index={5} className="bg-white/15" />
                  <InputOTPSlot index={6} className="bg-white/15" />
                  <InputOTPSlot index={7} className="bg-white/15" />
                  <InputOTPSlot index={8} className="bg-white/15" />
                  <InputOTPSlot index={9} className="bg-white/15" />
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <ComboBox
                  data={branches ?? []}
                  value={field.value}
                  setValue={field.onChange}
                  placeholder="Search branch..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graduation Year</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {getGraduationYears().map((year, idx) => (
                      <SelectItem key={idx} value={`${year}`}>
                        {year} (
                        {idx == 0
                          ? "4th B.Tech, 2nd MCA"
                          : idx == 1
                            ? "3rd B.Tech, 1st MCA"
                            : idx == 2
                              ? "2nd B.Tech"
                              : idx == 3
                                ? "1st B.Tech"
                                : ""}
                        )
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-center gap-2">
          <Button className="bg-yellow-300 hover:bg-yellow-300" type="submit">
            Submit
          </Button>
          <p className="mb-4 text-center text-sm">
            Already have an account?
            <strong className="underline">
              <Link href="/auth/login">LogIn </Link>{" "}
            </strong>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;