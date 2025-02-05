import React from 'react';
import { Helmet } from 'react-helmet';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  CircularProgress,
  Divider,
  Box,
  Paper,
  Link,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';

import { useIndexData } from 'hooks/useIndexData/useIndexData';

const helmetHead = (
  <Helmet>
    <title>Generatory 3.0</title>
  </Helmet>
);

export const IndexPage = () => {
  const state = useIndexData();

  if (state.state === 'loading') {
    return (
      <>
        {helmetHead}
        <ContentWrapper noHeader>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </ContentWrapper>
      </>
    );
  }

  return (
    <>
      {helmetHead}
      <Header>
        Generatory 3.0
        <div style={{ flex: 1 }} />
        <Typography variant="subtitle1">
          <Box textAlign={['center', 'left']}>
            <Link component={RouterLink} to="/donate">
              Donate
            </Link>
          </Box>
        </Typography>
      </Header>
      <ContentWrapper>
        <Paper variant="outlined">
          <List disablePadding>
            {state.data.pages.map(({ title, id }, i) => (
              <React.Fragment key={id}>
                {i > 0 && <Divider />}
                <ListItem
                  role={undefined}
                  dense
                  button
                  component={RouterLink}
                  to={`/${id}`}
                >
                  <ListItemText
                    primary={
                      <>
                        {title} <strong>({id.toUpperCase()})</strong>
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </ContentWrapper>
    </>
  );
};
