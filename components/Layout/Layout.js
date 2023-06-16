/* Layout component */

import { SafeAreaView } from "react-native";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <SafeAreaView>
      {/* <Header /> */}
      {children}
    </SafeAreaView>
  );
};

export default Layout;
