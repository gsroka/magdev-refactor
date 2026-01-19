import { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface TourStep {
  selector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

// TODO:
const tourSteps: TourStep[] = [
  {
    selector: '.tour-trigger-button',
    title: 'Welcome to OmniGuide!',
    content: 'Click here anytime to restart the product tour.',
    position: 'bottom',
  },
  {
    selector: '.stat-card-0',
    title: 'Your Key Metrics',
    content: 'This card shows your active users. Keep an eye on this KPI!',
    position: 'bottom',
  },
  {
    selector: '.add-user-button',
    title: 'Add New Users',
    content: 'Click here to add new users to your organization.',
    position: 'left',
  },
  {
    selector: '.user-table-container',
    title: 'User Management',
    content: 'View and manage all your users in this table.',
    position: 'top',
  },
  {
    selector: '.featured-user-row',
    title: 'Featured User!',
    content: 'This is a VIP user that was just added to the system.',
    position: 'top',
  },
  {
    selector: '.notifications-button',
    title: 'Notifications',
    content: "Check your notifications here. You're all caught up!",
    position: 'bottom',
  },
];

// TODO:
interface ProductTourProps {
  currentStep: number;
  isActive: boolean;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
}


// TODO: complexity
export default function ProductTour({ currentStep, isActive, nextStep, prevStep, endTour }: ProductTourProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateTooltipPosition = () => {
      if (!isActive) return;

      const step = tourSteps[currentStep];
      if (!step) return;

      // TODO:
      const targetElement = document.querySelector(step.selector);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetRect(rect);

        let top;
        let left;
        const tooltipWidth = 320;
        const tooltipHeight = 180;
        const offset = 12;

        switch (step.position) {
          case 'bottom':
            top = rect.bottom + offset;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'top':
            top = rect.top - tooltipHeight - offset;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.left - tooltipWidth - offset;
            break;
          case 'right':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + offset;
            break;
          default:
            top = rect.bottom + offset;
            left = rect.left;
        }

        // Clamp to viewport
        top = Math.max(10, Math.min(top, window.innerHeight - tooltipHeight - 10));
        left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));

        setTooltipPosition({ top, left });
      } else {
        setTargetRect(null);
        setTooltipPosition({ top: 100, left: 100 });
      }
    };

    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
    // TODO:
    const intervalId = setInterval(updateTooltipPosition, 100);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [currentStep, isActive]);

  if (!isActive) return null;

  const step = tourSteps[currentStep];
  if (!step) {
    endTour();
    return null;
  }

  const isLastStep = currentStep === tourSteps.length - 1;

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
            border: '3px solid #1976d2',
            borderRadius: '8px',
            zIndex: 1301,
            pointerEvents: 'none',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease-in-out',
          }}
        />
      )}

      <Paper
        elevation={8}
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
            {step.title}
          </Typography>
          <Button size="small" onClick={endTour} sx={{ minWidth: 'auto', p: 0.5 }}>
            <CloseIcon fontSize="small" />
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {step.content}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Step {currentStep + 1} of {tourSteps.length}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {currentStep > 0 && (
              <Button variant="outlined" size="small" onClick={prevStep}>
                Back
              </Button>
            )}
            {isLastStep ? (
              <Button variant="contained" size="small" onClick={isLastStep ? endTour : nextStep}>
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={nextStep}
                className="tour-next-button"
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
}
