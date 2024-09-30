import {
  IoAppsOutline,
  IoGridOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPieChartOutline,
} from "react-icons/io5";
import { PiPlugsConnectedFill } from "react-icons/pi";

const Sidebar = () => {
  const navLinks = [
    {
      title: "Home",
      icon: <IoHomeOutline color="#555" size={22} />,
      active: false,
    },
    {
      title: "Boards",
      icon: <IoAppsOutline color="#555" size={22} />,
      active: true,
    },
    {
      title: "Projects",
      icon: <IoGridOutline color="#555" size={22} />,
      active: false,
    },
    {
      title: "Analytics",
      icon: <IoPieChartOutline color="#555" size={22} />,
      active: false,
    },
    {
      title: "Workflows",
      icon: <IoPeopleOutline color="#555" size={22} />,
      active: false,
    },
    {
      title: "Notifications",
      icon: <IoNotificationsOutline color="#555" size={22} />,
      active: false,
    },
    // {
    //   title: "Newsletter",
    //   icon: <IoNewspaperOutline color="#555" size={22} />,
    //   active: false,
    // },
  ];

  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col z-50">
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
        <span className="text-[#786FB9] font-semibold text-2xl md:block hidden hover:scale-110 cursor-pointer duration-300 ease-in-out">
          RemoteSync
          <PiPlugsConnectedFill className="inline-block ml-2 text-[#786FB9}" />
        </span>
        <span className="text-[#786FB9] font-semibold text-2xl md:hidden block">
          L.
        </span>
      </div>
      <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
        {navLinks.map((link) => {
          return (
            <div
              key={link.title}
              className={`flex items-center gap-2 w-full rounded-lg hover:bg-[#786FB9] hover:text-white px-2 py-3 cursor-pointer duration-300 ease-in-out ${
                link.active ? "bg-[#786FB9]" : "bg-transparent"
              }`}>
              {link.icon}
              <span className="font-medium text-[15px] md:block hidden hover:text-white">
                {link.title}
              </span>
            </div>
          );
        })}
        <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-[#786FB9] hover:text-white px-2 py-3 cursor-pointer bg-gray-200 duration-200 ease-in-out">
        <IoLogOutOutline />
          <span className="font-medium text-[15px] md:block hidden">
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
