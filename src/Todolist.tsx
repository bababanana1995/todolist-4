import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, check: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [buttonName, setbuttonName] = useState<FilterValuesType>('all')
    const addTask = () => {
        if (title.trim() !== '' || null) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Какого хрена пробелы что шутка?')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    // const onAllClickHandler = () => {
    //     props.changeFilter("all");
    //     setbuttonName('all')
    // }
    // const onActiveClickHandler = () => {
    //     props.changeFilter("active");
    //     setbuttonName('active')
    // }
    // const onCompletedClickHandler = () => {
    //     props.changeFilter("completed");
    //     setbuttonName('completed')
    // }
    const tsarHandler = (value: FilterValuesType) => {
        props.changeFilter(value);
        // setbuttonName(value)
    }
    const onChangeStatusHandler = (id: string, e:boolean) => {
        props.changeStatus(id, e)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ''}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={s.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    //     props.changeStatus(t.id,e.currentTarget.checked)
                    // }
                    return <li key={t.id}>
                        <button onClick={onClickHandler}>x</button>
                        <input onChange={(event) => onChangeStatusHandler(t.id, event.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                        <span className={t.isDone ? s.isDone : ''}> {t.title}</span>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? s.activeFilter : ''} onClick={() => tsarHandler('all')}>All
            </button>
            <button className={buttonName === 'active' ? s.activeFilter : ''}
                    onClick={() => tsarHandler('active')}>Active
            </button>
            <button className={buttonName === 'completed' ? s.activeFilter : ''}
                    onClick={() => tsarHandler('completed')}>Completed
            </button>
        </div>
    </div>
}
