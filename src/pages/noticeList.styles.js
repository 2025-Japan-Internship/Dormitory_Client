import styled from "styled-components";
export const Container = styled.div`
  width: 393px;
  height: 898px;
  background: #f4f4f4;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const Header = styled.header`
  background: #ffffff;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
`;

export const BackBtn = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export const ScrollArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const ListBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
`

export const NoticeItem = styled.div`
  padding: 18px 20px;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #f0f0f0")};
  cursor: pointer;
`

export const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
`

export const NoticeTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin: 0;
  line-height: 1.5;
  flex: 1;
`

export const NoticeDate = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`

export const NewDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff4444;
  margin-top: 6px;
  flex-shrink: 0;
`

export const BottomNav = styled.div`
  height: 70px;
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 0 20px;
`

export const NavBar = styled.div`
  width: 134px;
  height: 5px;
  background: #333;
  border-radius: 100px;
`

export const ConfirmButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #00c853;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const EditButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
`