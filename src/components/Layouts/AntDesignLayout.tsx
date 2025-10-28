"use client";
import { Flex, Layout, theme } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { useToken } = theme;
interface AntDesignLayoutProps {
    children: React.ReactNode;
}

const AntDesignLayout: React.FC<AntDesignLayoutProps> = ({ children }) => {
    const { token } = useToken();
    const year = new Date().getFullYear();
    return (
        <Layout>
            <Header style={{ background: token.colorPrimary, color: token.colorBgBase }}>
                <Flex gap="small" justify="space-between" align="center" style={{ fontSize: "18px" }}>
                    <h1>Ant Design Playground</h1>
                    <a
                        href="https://github.com/iannerney/ant-design-theme-playground"
                        style={{ color: token.colorBgBase }}
                    >
                        <GithubOutlined />
                    </a>
                </Flex>
            </Header>
            <Content style={{ background: token.colorBgBase }}>{children}</Content>
            <Footer>
                © {year === 2024 ? year : `2024-${year}`} Ian Nerney, Courtney Newcomer, Brent Bautista, and{" "}
                <a href="https://github.com/iannerney/ant-design-theme-playground">other contributors</a>
            </Footer>
        </Layout>
    );
};

export default AntDesignLayout;
