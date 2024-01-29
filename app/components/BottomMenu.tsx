import { useNavigate, useLocation } from "@remix-run/react";

import { Tabbar, TabbarLink, Icon } from "konsta/react";
import {
  LayoutDashboard,
  List,
  User,
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function BottomMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  function activeLink(path: string) {
    const pathname = location.pathname;
    if (pathname === path) return true;
    else if (pathname.includes(path) && path !== "/") return true;
    else return false;
  }

  return (
    <Tabbar labels icons className="bottom-0 fixed h-24 max-w-md pt-2">
      <TabbarLink
        active={activeLink("/")}
        icon={
          <Icon
            ios={<LayoutDashboard className="w-7 h-7" />}
            material={<LayoutDashboard className="w-7 h-7" />}
          />
        }
        label="Home"
        onClick={() => navigate("/")}
      />
      <TabbarLink
        active={activeLink("lessons")}
        icon={
          <Icon
            ios={<List className="w-7 h-7" />}
            material={<List className="w-7 h-7" />}
          />
        }
        label="Lessons"
        onClick={() => navigate("/lessons")}
      />
      <TabbarLink
        active={activeLink("forum")}
        icon={
          <Icon
            ios={<MessageCircle className="w-7 h-7" />}
            material={<MessageCircle className="w-7 h-7" />}
          />
        }
        label="Forum"
        onClick={() => navigate("/forum")}
      />
      <TabbarLink
        active={activeLink("gyms")}
        icon={
          <Icon
            ios={<MapPin className="w-7 h-7" />}
            material={<MapPin className="w-7 h-7" />}
          />
        }
        label="Gyms"
        onClick={() => navigate("/gyms")}
      />

      <TabbarLink
        active={activeLink("profile")}
        icon={
          <Icon
            ios={<User className="w-7 h-7" />}
            material={<User className="w-7 h-7" />}
          />
        }
        label="Profile"
        onClick={() => navigate("profile")}
      />
    </Tabbar>
  );
}
