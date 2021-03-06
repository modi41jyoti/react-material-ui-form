import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import FormControlClone from '../FormControlClone'


const field = {
  isPristine: true,
  isRequired: null,
  pristineValue: null,
  validations: [],
  validators: [],
  value: undefined,
}

describe('<FormControlClone>:<Select>', () => {
  const formControlComp = (
    <FormControl required>
      <InputLabel htmlFor="age-helper">Age</InputLabel>
      <Select value="" name="age">
        <MenuItem value=""><em>Please select your age ...</em></MenuItem>
        <MenuItem value={10}>Teens</MenuItem>
        <MenuItem value={20}>Twenties</MenuItem>
        <MenuItem value={30}>Thirties</MenuItem>
        <MenuItem value="40+">Fourties +</MenuItem>
      </Select>
      <FormHelperText>Some important helper text</FormHelperText>
    </FormControl>
  )

  const wrapper = shallow(
    <FormControlClone
      field={field}
      formControlComp={formControlComp}
      onConstruct={jest.fn()}
      onValueChange={jest.fn()}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  /* TODO: how to simulate on children? */
  // it('should handle onChange events of children', () => {
  //   const value = '10'
  //   const event = { target: { value } }
  //   wrapper.find(FormControlClone).simulate('change', event)
  //   expect(wrapper.state()).toMatchObject({
  //     isError: false,
  //     value,
  //   })
  //   expect(wrapper.instance().props.onValueChange).toHaveBeenCalled()
  // })
})

describe('<FormControlClone>:<RadioGroup>', () => {
  const formControlComp = (
    <FormControl
      component="fieldset"
      required
    >
      <FormLabel component="legend">
        RadioGroup FormControl
      </FormLabel>
      <RadioGroup
        name="certainty"
        value=""
      >
        <FormControlLabel
          value="high"
          control={<Radio />}
          label="I swear"
        />
        <FormControlLabel
          value="soso"
          control={<Radio />}
          label="Probably"
        />
        <FormControlLabel
          value="low"
          control={<Radio />}
          label="Maybe"
        />
      </RadioGroup>
    </FormControl>
  )

  const wrapper = shallow(
    <FormControlClone
      field={field}
      formControlComp={formControlComp}
      onConstruct={jest.fn()}
      onValueChange={jest.fn()}
    />
  )

  it('should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<FormControlClone> Invalid props', () => {
  it('should throw if formControlComp type is other than FormControl', () => {
    let error
    try {
      shallow(
        <FormControlClone
          field={field}
          formControlComp={<input />}
          onConstruct={jest.fn()}
          onValueChange={jest.fn()}
        />
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })

  it('should throw if formControlComp group has no name or value props', () => {
    const formControlComp = (
      <FormControl>
        <InputLabel>Age</InputLabel>
        <Select>
          <MenuItem value=""><em>Please select your age ...</em></MenuItem>
          <MenuItem value={10}>Teens</MenuItem>
        </Select>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
    )

    let error
    try {
      shallow(
        <FormControlClone
          field={field}
          formControlComp={formControlComp}
          onConstruct={jest.fn()}
          onValueChange={jest.fn()}
        />
      )
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(Error)
  })
})
