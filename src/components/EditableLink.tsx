
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EditableLink.css';

interface EditableLinkProps {
  to: string;
  text: string;
  styleType?: 'button' | 'link';
  style?: React.CSSProperties;
}

const EditableLink: React.FC<EditableLinkProps> = ({ to, text, styleType = 'button', style }) => {
  const className = styleType === 'button' ? 'editable-link-btn' : 'editable-link-text';
  return (
    <Link to={to} className={className} style={style}>
      {text}
    </Link>
  );
};

export default EditableLink;
