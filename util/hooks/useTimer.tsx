import { useEffect, useRef, useState } from 'react'

export default function Countdown(time: number) {
	const [num, setNum] = useState(time)
	const [complete, setComplete] = useState(false)

	const intervalRef = useRef()

	const decreaseNum = () => setNum(prev => prev - 1)

	useEffect(() => {
		if (!complete) {
			intervalRef.current = setInterval(decreaseNum, 1000)
			if (num <= 1) {
				setComplete(true)
			}
		}
		return () => clearInterval(intervalRef.current)
	}, [num])

	return { num, complete }
}
