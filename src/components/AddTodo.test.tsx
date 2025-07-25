import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import AddTodo from './AddTodo'

describe('AddTodo', () => {
  const inputTestId = 'task-input-field'
  const mockAddTodo = vi.fn()

  beforeEach(() => {
    mockAddTodo.mockClear()
  })

  test('should have placeholder text', () => {
    render(<AddTodo addTodo={mockAddTodo} />)
    const input = screen.getByTestId(inputTestId)
    expect(input).toHaveAttribute('placeholder', 'Add task...')
  })

  test('should allow text to be entered', () => {
    render(<AddTodo addTodo={mockAddTodo} />)
    const input = screen.getByTestId(inputTestId)
    fireEvent.change(input, { target: { value: 'SampleTodoTask' } })
    expect(input).toHaveValue('SampleTodoTask')
  })

  test('should show an alert when form is submitted with empty input', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<AddTodo addTodo={mockAddTodo} />)
    const form = screen.getByTestId('task-form')

    fireEvent.submit(form)

    expect(alertSpy).toHaveBeenCalledWith('Please add a task description.')

    alertSpy.mockRestore()
  })
})

