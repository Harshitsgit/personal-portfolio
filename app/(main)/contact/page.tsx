"use client";
import type React from "react";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pb-20 pt-16 px-10 flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto py-4 max-w-6xl ">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Contact Us
        </h1>
        <div className="h-1 w-20 bg-indigo-500 mt-1"></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-indigo-500 mb-2">
                Don't Worry Your Picture will be perfect
              </h2>
              <p className="text-gray-300">
                Got a special occasion coming up? Whether it's a dream wedding,
                a magical pre-wedding shoot, a beautiful maternity session, or a
                personal photoshoot that tells your story—we're here to turn
                your vision into stunning visuals. Let us capture the magic of
                your moment and create memories you'll cherish forever.
                Experience the artistry that transforms every frame into a
                timeless masterpiece.
              </p>
            </div>

            <div className="space-y-6 mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-3 flex items-center gap-4">
                  <div className="bg-indigo-900/30 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email Us</h3>
                    <p className="text-gray-400">agEditographer@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-3 flex items-center gap-4">
                  <div className="bg-indigo-900/30 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Call Us</h3>
                    <p className="text-gray-400">+(91) 8668645947</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-3 flex items-center gap-4">
                  <div className="bg-indigo-900/30 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Visit Us</h3>
                    <p className="text-gray-400">
                      In front of krishna bhawan masanganj Amravati
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-300"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="exampleemail.com"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Please mention event"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px] resize-none"
                    rows={5}
                    required
                  />
                </div>
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-700"
                >
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
