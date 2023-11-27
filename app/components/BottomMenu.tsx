import { useNavigate } from "@remix-run/react";
import { Tabbar, TabbarLink, Icon } from "konsta/react";
import { LayoutDashboard, List, User, MessageCircle } from "lucide-react";

export default function BottomMenu() {
  const navigate = useNavigate();
  return (
    <Tabbar labels icons className="left-0 bottom-0 fixed h-20">
      <TabbarLink
        icon={
          <Icon
            ios={<LayoutDashboard className="w-5 h-5" />}
            material={<LayoutDashboard className="w-5 h-5" />}
          />
        }
        label="Home"
        onClick={() => navigate("/")}
      />
      <TabbarLink
        icon={
          <Icon
            ios={<List className="w-5 h-5" />}
            material={<List className="w-5 h-5" />}
          />
        }
        label="Lessons"
        onClick={() => navigate("/lessons")}
      />
      <TabbarLink
        icon={
          <Icon
            ios={<MessageCircle className="w-5 h-5" />}
            material={<MessageCircle className="w-5 h-5" />}
          />
        }
        label="Forum"
        onClick={() => navigate("/forum")}
      />
      <TabbarLink
        active
        icon={
          <Icon
            ios={<User className="w-5 h-5" />}
            material={<User className="w-5 h-5" />}
          />
        }
        label="Profile"
        onClick={() => navigate("/profile")}
      />
    </Tabbar>
  );
}
