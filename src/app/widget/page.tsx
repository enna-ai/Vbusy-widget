"use client";

import React, { useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import Widget from "@/components/Widget";
import { Task } from "@/interfaces/task";
import { API_BASE_URL } from "@/utils/consts";
import axios from "axios";

const WidgetPage: React.FC = () => {
    const [userData, setUserData] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");
    const borderRadiusParam = searchParams.get("borderRadius") ?? "false";
    const borderRadius = JSON.parse(borderRadiusParam);
    const headerColor = searchParams.get("headerColor");
    const bodyColor = searchParams.get("bodyColor");
    const textColor = searchParams.get("textColor");
    const accentColor = searchParams.get("accentColor");
    const dueDatesParam = searchParams.get("dueDates") ?? "false";
    const dueDates = JSON.parse(dueDatesParam);
    const priorityLevelsParam = searchParams.get("priorityLevels") ?? "false";
    const priorityLevels = JSON.parse(priorityLevelsParam);
    const completedParam = searchParams.get("hideCompleted") ?? "false";
    const hideCompleted = JSON.parse(completedParam);

    useEffect(() => {
        const getUserTasks = async () => {
            try {
                setError(null);

                if (!userId) {
                    setError("Missing User ID");
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/v1/vbusy/${userId}`);
                const data = await response.data;
                const filteredData = data.filter((item: Task) => !item.archived);
                setUserData(filteredData);
            } catch (error) {
                setError("Invalid User ID");
                console.error("Error fetching user:", error);
            }
        };

        getUserTasks();
    }, []);

    return <Widget userId={userId} headerColor={headerColor} bodyColor={bodyColor} textColor={textColor} accentColor={accentColor} borderRadius={borderRadius} dueDates={dueDates} priorityLevels={priorityLevels} hideCompleted={hideCompleted} userData={userData} errorMsg={error} />
};

export default WidgetPage;
