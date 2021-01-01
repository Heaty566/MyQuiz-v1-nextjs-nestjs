import React, { FunctionComponent } from "react";
import FormInput from "../../components/form/FormInput";
import FormCheckBox from "../../components/form/FormCheckBox";
import { ProfileForm } from "./index";
import "../../styles/pages/_profile.scss";
import BtnForm from "../../components/btn/BtnForm";

export interface ProfileSceneProps {
        register: Function;
        handleOnSubmit: Function;
        handleOnCheckBox: Function;
        currentValue: ProfileForm;
        errors: any;
        message: string;
        isLoading: boolean;
}

const ProfileScene: FunctionComponent<ProfileSceneProps> = ({
        handleOnSubmit,
        register,
        currentValue,
        handleOnCheckBox,
        errors,
        isLoading,
        message = "",
}) => {
        return (
                <div className="profile f--s">
                        <h1 className="profile__title">Update Your Profile</h1>

                        <form className="form f--c" onSubmit={(event) => handleOnSubmit(event)}>
                                {Boolean(message.length) && (
                                        <div className="form__col">
                                                <div className="form__message">{message}</div>
                                        </div>
                                )}
                                <div className="form__col">
                                        <label className="form__label" htmlFor="fullName">
                                                Full name
                                        </label>
                                        <FormInput
                                                placeholder="Name"
                                                name="fullName"
                                                register={register}
                                                errorMessage={errors["fullName"]}
                                        />
                                </div>
                                <div className="form__col">
                                        <label className="form__label" htmlFor="isTeacher">
                                                Are you teacher
                                        </label>
                                        <FormCheckBox
                                                name="isTeacher"
                                                register={register}
                                                value={currentValue.isTeacher}
                                                handleOnClick={handleOnCheckBox}
                                        />
                                </div>
                                <div className="form__col">
                                        <BtnForm label="Change" isLoading={isLoading} />
                                </div>
                        </form>
                </div>
        );
};

export default ProfileScene;
