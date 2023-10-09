import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Task } from '@/interfaces/task';
import moment from "moment";
import BeeImage from "../../public/bee.png";
import styles from "@/styles/modules/widget.module.scss";

interface WidgetProps {
    userId: string | null;
    borderRadius: string;
    headerColor: string | null;
    bodyColor: string | null;
    textColor: string | null;
    dueDates: string;
    priorityLevels: string;
    userData: Task[];
    errorMsg: string | null;
}

const Widget: React.FC<WidgetProps> = ({ userId, borderRadius, headerColor, bodyColor, textColor, dueDates, priorityLevels, userData, errorMsg }) => {

    const formatDueDate = (date: string) => {
        if (date) {
            return moment(date).format("MMM Do YYYY");
        }
    };

    const remainingTasksCount = userData.length - 3;

    const priorityColors = {
        low: "#a6da95",
        medium: "#f5a97f",
        high: "#ed8796",
    } as any;

    return (
        <>
            <div className={styles.widgetWrapper} style={{ borderRadius: borderRadius ? "25px" : "0px", backgroundImage: `linear-gradient(0deg, ${bodyColor} 72%, ${headerColor} 72%)`, color: textColor ?? "#eaefff" }}>
                <div className={styles.widgetContainer}>
                    <div className={styles.widgetHeader}>
                        <h2 className={styles.widgetHeading}>My Tasks <span className={styles.taskCount}>{userData.length}</span></h2>
                        <Link href="https://vbusy.vercel.app/login" target="_blank" rel="noopener noreferrer">
                            <Image className={styles.widgetIcon} src={BeeImage} alt="Vbusy Widget Icon" width={30} height={30} />
                        </Link>
                    </div>
                    <div className={styles.widgetBody}>
                        {errorMsg ? (
                            <p className={styles.invalidBody}>{errorMsg}</p>
                        ) : (
                            <ul className={styles.taskBody}>
                                {userData.map((item, index) => (
                                    <div key={index}>
                                        <div className={styles.taskContent}>
                                            <li className={styles.taskItem} key={index}>
                                                {priorityLevels &&
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
                                        {index !== 2 && <hr />}
                                    </div>
                                )).slice(0, 3)}

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
        </>
    );
};

export default Widget;