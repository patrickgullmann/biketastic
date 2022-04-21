import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndWannabees,
    makeFriend,
    unfriendFriend,
} from "./redux/friends-wannabees/slice.js";

export default function FriendsAndWannabees() {
    const dispatch = useDispatch();

    const wannabees = useSelector(
        (state) =>
            state.friendsWannabees &&
            state.friendsWannabees.filter((friendship) => !friendship.accepted)
    );

    console.log("wannabees: ", wannabees);

    const friends = useSelector(
        (state) =>
            state.friendsWannabees &&
            state.friendsWannabees.filter((friendship) => friendship.accepted)
    );

    console.log("friends: ", friends);

    // When component mounts, get all friends and wannabees
    useEffect(() => {
        (async () => {
            const res = await fetch("/api/friends-wannabees");
            const data = await res.json();
            dispatch(receiveFriendsAndWannabees(data));
        })();
    }, []);

    const handleAccept = (wannabeeId) => {
        (async () => {
            const res = await fetch("/api/accept-friend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId: wannabeeId,
                }),
            });
            const data = await res.json();
            dispatch(makeFriend(data.otherUserId));
        })();
    };

    //other way - just to train both ways
    const handleUnfriend = (friendId) => {
        (async () => {
            const res = await fetch(`/api/unfriend/${friendId}`, {
                method: "POST",
            });
            const data = await res.json();
            if (data.success) {
                dispatch(unfriendFriend(friendId));
            }
        })();
    };

    return (
        <section>
            <h1>Friends</h1>
            {friends.map((friend) => {
                return (
                    <div key={friend.id}>
                        <img
                            className="friendsWannabeesImg"
                            src={
                                friend.image_url || "/images/defaultPicture.png"
                            }
                            height={200}
                        ></img>
                        <p>
                            {friend.first} {friend.last}
                        </p>
                        <button onClick={() => handleUnfriend(friend.id)}>
                            Unfriend
                        </button>
                    </div>
                );
            })}

            <h1>Wannabees</h1>
            {wannabees.map((wannabee) => {
                return (
                    <div key={wannabee.id}>
                        <img
                            className="friendsWannabeesImg"
                            src={
                                wannabee.image_url ||
                                "/images/defaultPicture.png"
                            }
                            height={200}
                        ></img>
                        <p>
                            {wannabee.first} {wannabee.last}
                        </p>
                        <button onClick={() => handleAccept(wannabee.id)}>
                            Accept Friend Request
                        </button>
                    </div>
                );
            })}
        </section>
    );
}

// --------------- csl the state ---------------------------

// const wannabees = useSelector((state) => {
//     console.log("here is state", state);
//     return (
//         state.friendsWannabees &&
//         state.friendsWannabees.filter((friendship) => !friendship.accepted)
//     );
// });
