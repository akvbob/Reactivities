import { observer } from "mobx-react-lite";
import React, { FormEvent, useContext, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/modules/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
import { useEffect } from "react";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  //then we are passing 'initializeForm' into useState when we initialize the form
  //and we set our activity inside our state and pass this down into our form.
  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    // clear activity from activity store
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              rows={2}
              placeholder="Description"
              value={activity.description}
            />
            <Form.Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              onChange={handleInputChange}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              onChange={handleInputChange}
              name="city"
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              onChange={handleInputChange}
              name="venue"
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
