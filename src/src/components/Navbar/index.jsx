import {
	IoChevronDownOutline,
	IoNotificationsOutline,
	IoPersonCircleOutline,
	IoSearchOutline,
	IoSettingsOutline,
	IoShareSocialOutline,
  } from "react-icons/io5";
  
  const Navbar = () => {
	return (
	  <div className=" z-50 md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
		<div className="flex items-center gap-3 cursor-pointer">
			<div className="hover:scale-110"><IoPersonCircleOutline color="#786FB9" size={34} /></div>
		  
		  <span className="text-[#786FB9] bg-slate-300 hover:bg-[#786FB9] rounded-full p-2 cursor-pointer font-semibold md:text-sm text-xs whitespace-nowrap hover:text-white duration-300 ease-in-out">
   				 Ahmed Ali
				</span>
				<IoChevronDownOutline
					
					color="#786FB9"
					size={17}
				/>
		</div>
		<div className="flex items-center gap-2 md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-2 py-[5px]">
				<IoSearchOutline color={"#786FB9"} size={20} 
				 />
		  <input
			type="text"
			placeholder="Search"
			className="w-full bg-gray-100 outline-none text-[15px]"
		  />
		</div>
		<div className="md:flex hidden items-center gap-4 px-2">
			<div className="grid place-items-center bg-slate-300 rounded-full p-2 cursor-pointer hover:scale-110 hover:bg-[#786FB9]  duration-300 ease-in-out">
					<IoShareSocialOutline color={"#FFFFFF"} size={18}
					 />
				</div>
				<div className="grid place-items-center bg-slate-300 rounded-full p-2 cursor-pointer hover:scale-110 hover:bg-[#786FB9]  duration-300 ease-in-out">
					<IoSettingsOutline color={"#FFFFFF"} size={18} />
				</div>
				<div className="grid place-items-center bg-slate-300 rounded-full p-2 cursor-pointer hover:scale-110 hover:bg-[#786FB9]  duration-300 ease-in-out">
					<IoNotificationsOutline color={"#FFFFFF"} size={18} />
				</div>
			</div>
		</div>
	);
  };
  
  export default Navbar;
  