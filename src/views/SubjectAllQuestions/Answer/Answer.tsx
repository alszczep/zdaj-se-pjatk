import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, Box } from '@material-ui/core';

import { UserContent } from 'components/UserContent/UserContent';
import { Subject } from 'validators/subjects';
import { Fragment } from 'react';
import { useStyles } from './Answer.styles';

interface Props {
  answer: Subject['data'][number]['answers'][number];
  userAnswer?: boolean;
  showCorrect: boolean;
  showUserSelect: boolean;
  disableUserSelect: boolean;
  wasUserSelectCorrect: boolean;
  onChange?: (value: boolean) => void;
}

export const Answer = ({
  answer: { answer, correct, isMarkdown },
  userAnswer,
  showCorrect,
  showUserSelect,
  disableUserSelect,
  wasUserSelectCorrect,
  onChange,
}: Props) => {
  const labelId = `checkbox-list-label-${answer}`;
  const classes = useStyles();

  const IconWrapper = showUserSelect && showCorrect ? ListItemIcon : Fragment;

  return (
    <>
      <Divider />
      <ListItem role={undefined} dense>
        <ListItemText
          id={labelId}
          primary={
            <Box>
              <UserContent isMarkdown={isMarkdown}>{answer}</UserContent>
            </Box>
          }
        />
        <IconWrapper>
          {showUserSelect && (
            <Checkbox
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              disabled={disableUserSelect}
              onChange={(v) => onChange?.(v.target.checked)}
              classes={
                disableUserSelect
                  ? {
                      root: wasUserSelectCorrect
                        ? classes.greenCheckboxRoot
                        : classes.redCheckboxRoot,
                    }
                  : undefined
              }
              checked={userAnswer}
              color="primary"
            />
          )}
          {showCorrect && (
            <Checkbox
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              checked={correct}
              disabled
            />
          )}
        </IconWrapper>
      </ListItem>
    </>
  );
};
