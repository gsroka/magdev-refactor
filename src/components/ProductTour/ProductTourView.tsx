import { Box, Typography, Button, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { TourStep } from './tourSteps';

interface ProductTourViewProps {
  tooltipPosition: { top: number; left: number };
  targetRect: DOMRect | null;
  currentStepData: TourStep | null;
  isLastStep: boolean;
  tooltipRef: React.RefObject<HTMLDivElement>;
  onEnd: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalSteps: number;
  currentStepIndex: number;
}

export const ProductTourView = ({
  tooltipPosition,
  targetRect,
  currentStepData,
  isLastStep,
  tooltipRef,
  onEnd,
  onNext,
  onPrev,
  totalSteps,
  currentStepIndex,
}: ProductTourViewProps) => {
  if (!currentStepData) return null;

  return (
    <>
      {/* Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
          // TODO: prevent clicking through overlay?
          pointerEvents: 'none',
        }}
      />

      {/* Spotlight on target element */}
      {targetRect && (
        <Box
          sx={{
            position: 'fixed',
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
            border: '3px solid',
            borderColor: 'primary.main',
            borderRadius: '8px',
            zIndex: 1301,
            pointerEvents: 'auto',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease-in-out',
          }}
        />
      )}

      <Paper
        ref={tooltipRef}
        elevation={8}
        role="dialog"
        aria-labelledby="tour-title"
        aria-describedby="tour-description"
        tabIndex={-1}
        sx={{
          position: 'fixed',
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: 320,
          zIndex: 1302,
          p: 2.5,
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {currentStepData.title}
          </Typography>
          <Button size="small" onClick={onEnd} sx={{ minWidth: 'auto', p: 0.5 }}>
            <CloseIcon fontSize="small" />
          </Button>
        </Box>

        <Typography id="tour-description" variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {currentStepData.content}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Step {currentStepIndex + 1} of {totalSteps}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {currentStepIndex > 0 && (
              <Button variant="outlined" size="small" onClick={onPrev}>
                Back
              </Button>
            )}
            <Button variant="contained" size="small" onClick={isLastStep ? onEnd : onNext}>
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
