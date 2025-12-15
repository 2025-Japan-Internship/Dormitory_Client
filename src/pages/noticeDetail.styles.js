import styled from "styled-components";
export const DetailContainer = styled.div`
  width: 393px;
  height: 898px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const DetailHeader = styled.header`
  height: 80px;
  background: #ffffff;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
`;

export const BackBtn = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const DetailContent = styled.main`
  padding: 24px 20px;
  overflow-y: auto;

  p {
    white-space: pre-wrap;
    line-height: 1.8;
    color: #666;
  }
`;

export const DetailTop = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;

  h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }
`









 
export const DetailDate = styled.p`
  font-size: 13px;
  color: #999;
  margin: 0;
`;