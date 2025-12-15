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
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  height: 80px !important; 
  border-bottom: #f4f4f4;
  position: sticky;  
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
  font-size: 20px;
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
`; 

