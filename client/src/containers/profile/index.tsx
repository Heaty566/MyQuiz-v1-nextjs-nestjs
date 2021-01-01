import React, { FunctionComponent, useEffect } from "react";
import ProfileScene from "./profile.scene";
import { useForm } from "react-hook-form";
import { selectUser } from "../../reducers/user.reducer";
import { useSelector } from "react-redux";
import { apiSelector } from "../../reducers/api.reducer";
import { updateUser, UpdateUser } from "../../actions/user.action";
import { store } from "../../reducers";

export interface ProfileProps {}

export interface ProfileForm extends UpdateUser {}

const Profile: FunctionComponent<ProfileProps> = () => {
        const { register, handleSubmit, setValue, getValues, watch } = useForm<ProfileForm>();
        const userState = useSelector(selectUser);
        const apiState = useSelector(apiSelector);
        watch("isTeacher");

        useEffect(() => {
                setValue("fullName", userState.fullName);
                setValue("isTeacher", userState.isTeacher);
        }, [userState, setValue]);

        const handleOnUpdateUser = (data: ProfileForm) => {
                store.dispatch(updateUser({ input: data }));
        };

        const handleCheckBox = (filed: keyof ProfileForm) => {
                const currentValue = getValues(filed);

                setValue(filed, !currentValue);
        };

        return (
                <ProfileScene
                        register={register}
                        handleOnSubmit={handleSubmit(handleOnUpdateUser)}
                        currentValue={getValues()}
                        handleOnCheckBox={handleCheckBox}
                        errors={apiState.errors}
                        isLoading={apiState.isLoading}
                        message={apiState.message}
                />
        );
};

export default Profile;
