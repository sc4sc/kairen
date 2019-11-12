import React from 'react'
import { Text } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

// eslint-disable-next-line import/extensions
import Button from './Button'
import CenterView from './CenterView'
import Welcome from './Welcome'
import IncidentCard from '../../components/IncidentCard'
import { sampleIncident } from '../../constants/SampleIncidents'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))

storiesOf('IncidentCard', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('on checking incident', () => {
    const data = { ...sampleIncident[0], state: '확인중' }
    return <IncidentCard data={data} />;
  })
  .add('on handling incident', () => {
    const data = { ...sampleIncident[0], state: '처리중' }
    return <IncidentCard data={data} />;
  })
  .add('on complete incident', () => {
    const data = { ...sampleIncident[0], state: '완료' }
    return <IncidentCard data={data} />;
  })
