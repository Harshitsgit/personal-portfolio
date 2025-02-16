import { Instagram, Mail, Mailbox, MailIcon, Mails } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-4 backdrop-blur-sm border-b border-white/10  fixed bottom-0 left-0 right-0 z-50 header-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Ankit Gupta. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/mr.ag_editographer/"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="w-8 h-8 text-pink-600" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Mails className="w-8 h-8 text-indigo-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
