import { atomWithStorage } from "jotai/utils";

//This atom will store the state of the sidebar of the layout, means the ant design Sider component
const siderAtom = atomWithStorage("siderAtom", false);

export { siderAtom };
