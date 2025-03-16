"use client";
import { useAuth } from "@/modules/auth/provider";
import { useDisclosure } from "../hooks/useDisclosure";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import { IUser } from "@/modules/auth/types";
import { LogOut } from "lucide-react";
interface Props {
  user: IUser;
}

export const UserAvatar = ({ user }: Props) => {
  const { logout } = useAuth();
  const { toggle, opened } = useDisclosure();

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out. See you next time!");
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        {/* Profile Circle */}
        <div
          className={`flex items-center justify-cente hover:cursor-pointer rounded-full transition-all duration-150 ${
            opened ? "bg-gray-200" : "bg-transparent"
          }`}
          onClick={toggle}
        >
          <div className="bg-primary rounded-full text-center p-2 text-white font-bold">
            <p className="text-xs">
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-5 mt-2 w-72 top-16 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
          >
            <div className="px-4 py-3 flex justify-between gap-4 items-center">
              <div>
                <div>
                  <p className="font-semibold text-sm">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <p className="text-xs font-semibold text-primary">{user.company_name}</p>
                </div>
              </div>
              <div>
                <LogOut
                  onClick={handleLogout}
                  className="h-4 w-4 hover:cursor-pointer hover:text-primary transition-colors duration-300"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
