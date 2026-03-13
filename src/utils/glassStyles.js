// Glass morphism styling utilities

export const glassBoxStyles = {
  backdropFilter: 'blur(16px) saturate(180%)',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  borderRadius: '12px',
};

export const glassPaperStyles = {
  backdropFilter: 'blur(16px) saturate(180%)',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
};

export const glassContainerStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 2,
};
