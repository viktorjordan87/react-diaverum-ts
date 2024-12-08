import { HomeOutlined } from "@ant-design/icons";
import { Image, Menu, MenuProps } from "antd";
import logo from "@/assets/images/diaverum.png";
import logoShort from "@/assets/images/diaverum-short.png";
import { useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { siderAtom } from "@/state/layout";

const Sidebar = () => {
  //navigate
  const navigate = useNavigate();

  const [siderVisible] = useAtom(siderAtom);

  //Sidebar content, this is a separate component, so the sider and drawer can share the same content
  const items: MenuProps["items"] = [
    {
      label: "Dashboard",
      type: "group",
      children: [
        {
          key: "1",
          icon: <HomeOutlined />,
          label: "Home",
          onClick: () => navigate({ to: "/" }),
        },
      ],
    },
  ];

  return (
    <div className="shadow-black">
      <div className="p-2 my-4 grid place-items-center">
        <Image
          src={siderVisible ? logoShort : logo}
          preview={false}
          height={50}
          className="h-auto max-w-full"
        />
      </div>
      {/* This is the Sider component */}
      <Menu
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
