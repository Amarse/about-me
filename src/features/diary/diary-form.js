import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import { Input } from 'features/ui';
import { Button } from 'react-bootstrap';
import ReactQuill, { Quill } from 'react-quill';
import { useNavigate } from 'react-router';
import { dbService } from 'Fbase';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const DiaryForm = ({ userObj, seletedDate }) => {
  const navigate = useNavigate();
  const [quillText, setQuillText] = useState('');
  const [title, setTitle] = useState('');

  const modules = {
    ImageResize: {
      displaySize: true,
    },
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockqute'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const borad = {
    content: quillText,
    date: seletedDate,
    uid: userObj.uid,
    title: title,
    // veiw: veiw,
    name: userObj.displayName,
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // save
    await dbService.collection('borad').add(borad);
  };

  const onClick = (e) => {
    const {
      target: { name },
    } = e;
    if (name === 'cancel') {
      navigate('/board');
    }
    if (name === 'save') {
      window.alert('저장하시겠습니까?');
      navigate('/board');
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <Input
            value={title}
            type='text'
            name='제목'
            placeholder='제목을 입력해주세요'
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill
            modules={modules}
            value={quillText}
            onChange={(e) => setQuillText(e)}
          ></ReactQuill>
        </div>
        <div>
          <Button
            name='cancel'
            size='lg'
            value='Submit'
            onClick={onClick}
            variant='outline-secondary'
          >
            취소
          </Button>
          <Button
            name='save'
            size='lg'
            variant='secondary'
            type='submit'
            onClick={onClick}
          >
            작성하기
          </Button>
        </div>
      </form>
    </>
  );
};

export default DiaryForm;
