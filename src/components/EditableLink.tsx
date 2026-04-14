
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EditableLink.css';

interface EditableLinkProps {
  to: string;
  text: string;
  styleType?: 'button' | 'link';
  style?: React.CSSProperties;
  disabled?: boolean;
}

const EditableLink: React.FC<EditableLinkProps> = ({ to, text, styleType = 'button', style, disabled = false }) => {
  const className = styleType === 'button' ? 'editable-link-btn' : 'editable-link-text';
  
  if (disabled) {
    return (
      <span className={`${className} disabled`} style={style}>
        {text}
      </span>
    );
  }
  
  return (
    <Link to={to} className={className} style={style}>
      {text}
    </Link>
  );
};

export default EditableLink;
