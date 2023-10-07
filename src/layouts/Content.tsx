import NavbarCommon from "../common/NavbarCommon";

interface ContentProps {
  content: JSX.Element;
}

export default function ContentLayout({ content }: ContentProps) {
  return (
    <>
      <NavbarCommon />
      {content}
    </>
  );
}
