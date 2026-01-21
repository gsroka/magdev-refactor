import { Box } from '@mui/material';

interface SkeletonWrapperProps {
  children: React.ReactNode;
  loading: boolean;
  fallback: React.ReactNode;
  minHeight?: number | string;
  delay?: number;
}

function SkeletonWrapper({
  children,
  loading,
  fallback,
  minHeight,
  delay = 150,
}: SkeletonWrapperProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        minHeight,
        position: 'relative',
        width: '100%',
        '& > *': {
          gridArea: '1 / 1',
          minWidth: 0,
        },
      }}
    >
      <Box
        sx={{
          opacity: loading ? 1 : 0,
          visibility: loading ? 'visible' : 'hidden',
          transition: (theme) =>
            theme.transitions.create(['opacity', 'visibility'], {
              duration: 400,
              delay: loading ? `${delay}ms` : '0ms',
            }),
          pointerEvents: loading ? 'auto' : 'none',
        }}
      >
        {fallback}
      </Box>

      <Box
        sx={{
          opacity: !loading ? 1 : 0,
          visibility: !loading ? 'visible' : 'hidden',
          transition: (theme) =>
            theme.transitions.create(['opacity', 'visibility'], {
              duration: 400,
            }),
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default SkeletonWrapper;
