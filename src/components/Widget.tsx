import React, { useState, useEffect } from 'react';
import Image from "next/image";
import BeeImage from "../../public/bee.png";
import Link from "next/link";
import axios from 'axios';
import moment from "moment";
import styles from "@/styles/modules/widget.module.scss";

interface Task {
    task: string;
    dueDate: string;
    archived: boolean;
    priority: string;
}

interface WidgetProps {
    userId: string;
    radius: boolean;
    backgroundColor: string;
    textColor: string;
    dueDates: boolean;
    priorityLevel: boolean;
}

const Widget: React.FC<WidgetProps> = ({ userId, radius, backgroundColor, textColor, dueDates, priorityLevel }) => {
    const [fetchUser, setFetchUser] = useState<string | null>(null);
    const [userData, setUserData] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUserTasks = async () => {
            try {
                setError(null);

                const queryParams = new URLSearchParams(location.search);
                const queryUserId = queryParams?.get("userId") ?? "64fc8956eea9a7d89a5f901e";
                const queryRadius = queryParams?.get("radius") ?? true;
                const queryBgColor = queryParams?.get("backgroundColor") ?? "#181825";
                const queryTextColor = queryParams?.get("textColor") ?? "#eaefff";
                const queryDueDates = queryParams?.get("dueDates") ?? true;
                const queryPriority = queryParams?.get("priorityLevel") ?? true;

                if (queryUserId) {
                    setFetchUser(queryUserId);
                } else {
                    setError("Missing User ID");
                    return;
                }

                const response = await axios.get(`http://localhost:4000/api/v1/vbusy/${queryUserId}`);
                const data = await response.data;
                console.log("Data", data);
                const filteredData = data.filter((item: Task) => !item.archived);
                setUserData(filteredData);
            } catch (error) {
                setError("Invalid User ID");
                console.error("Error fetching user:", error);
            }
        };

        getUserTasks();
    }, [userId, radius, backgroundColor, textColor, dueDates, priorityLevel]);

    const formatDueDate = (date: string) => {
        if (date) {
            return moment(date).format("MMM Do YYYY")
        }
    };

    const remainingTasksCount = userData.length - 4;

    const priorityColors = {
        low: "#a6da95",
        medium: "#f5a97f",
        high: "#ed8796",
    } as any;

    return (
        <div className={styles.widgetWrapper} style={{ borderRadius: radius ? "25px" : "0px", backgroundColor: backgroundColor, color: textColor }}>
            <div className={styles.widgetContainer}>
                <div className={styles.widgetHeader}>
                    <h2 className={styles.widgetHeading}>My Tasks <span className={styles.taskCount}>{userData.length}</span></h2>
                    <Link href="http://localhost:3000/login" target="_blank" rel="noopener noreferrer">
                        <Image className={styles.widgetIcon} src={BeeImage} alt="Vbusy Widget Icon" width={30} height={30} />
                    </Link>
                </div>
                <div className={styles.widgetBody}>
                    {error ? (
                        <p className={styles.invalidBody}>{error}</p>
                    ) : (
                        <ul className={styles.taskBody}>
                            {userData.map((item, index) => (
                                <div>
                                    <div className={styles.taskContent}>
                                        <li className={styles.taskItem} key={index}>
                                            {priorityLevel &&
                                                <span className={styles.priorityLevelDot} style={{ background: priorityColors[item.priority] }}></span>
                                            }
                                            {item.task}
                                        </li>
                                        {dueDates &&
                                            <p style={{ color: moment(item.dueDate).isBefore(moment()) ? '#ed8796' : 'inherit' }}>
                                                {formatDueDate(item.dueDate)}
                                            </p>
                                        }
                                    </div>
                                    {index !== 3 && <hr />}
                                </div>
                            )).slice(0, 4)}

                            {remainingTasksCount > 0 && (
                                <span className={styles.remainingTasks}>
                                    + {remainingTasksCount} more task{remainingTasksCount > 1 ? "s" : ""}
                                </span>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Widget;