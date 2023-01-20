import React, {
  forwardRef, RefObject,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import {Button } from "@mui/material";

const FileUpload:React.FC<{
  uploadRef: RefObject<HTMLInputElement>
}> = forwardRef((props, context) => {

  const [imgSrc, setImgSrc] = useState('')

  const handleCheckFiles = () => {
    const files = props.uploadRef.current?.files
    if(files) {
      const formData = new FormData()
      formData.append('img', files[0])
      const imgSrc = URL.createObjectURL(files[0])

      setImgSrc(imgSrc)
    }
  }
  return <CustomUploadWrapper>
    <Button variant={'outlined'} component={'label'} onChange={handleCheckFiles} size={'small'}>
      <input type={'file'} hidden accept={'image/*'} ref={props.uploadRef}/>
      <span>파일선택</span>
    </Button>
    <img src={imgSrc} alt={'이미지 준비중'}/>
  </CustomUploadWrapper>
})

export default FileUpload

const CustomUploadWrapper = styled.div`
  width: 100%;
  background: #eee;
  display: flex;
  gap: 24px;
  
  img {
    width: 72px;
    aspect-ratio: 1;
  }
`