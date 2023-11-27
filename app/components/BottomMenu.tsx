import { useNavigate, useLocation } from "@remix-run/react";

import { Tabbar, TabbarLink, Icon } from "konsta/react";
import { LayoutDashboard, List, User, MessageCircle, MapPin } from "lucide-react";

export default function BottomMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  function activeLink(path: string) {
    if (location.pathname === path) return true;
    return false;
  }

  return (
    <Tabbar labels icons className="left-0 bottom-0 fixed h-20">
      <TabbarLink
        active={activeLink("/")}
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
        active={activeLink("/lessons")}
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
        active={activeLink("/forum")}
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
        active={activeLink("/profile")}
        icon={
          <Icon
            ios={<User className="w-5 h-5" />}
            material={<User className="w-5 h-5" />}
          />
        }
        label="Profile"
        onClick={() => navigate("/profile")}
      />
      <TabbarLink
        active={activeLink("/gyms")}
        icon={
          <Icon
            ios={<MapPin className="w-5 h-5" />}
            material={<MapPin className="w-5 h-5" />}
          />
        }
        label="Gyms"
        onClick={() => navigate("/gyms")}
      />
    </Tabbar>
  );
}
