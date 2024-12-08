import { siderAtom } from "@/state/layout";
import { useAtom } from "jotai";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Avatar, MenuProps } from "antd";
import { useNavigate, useRouter } from "@tanstack/react-router";

const Header = () => {
  const [siderVisible, setSiderVisible] = useAtom(siderAtom);

  //logout
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
  };

  //user menu items
  const menuItems: MenuProps["items"] = [
    {
      key: "3",
      label: "Logout",
      onClick: async () => {
        handleLogout();
      },
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between h-full">
      <Button
        className="rounded-full"
        type="text"
        icon={siderVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setSiderVisible(!siderVisible)}
      />

      <div className="inline-flex items-center gap-4">
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
          arrow
          className="cursor-pointer"
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
